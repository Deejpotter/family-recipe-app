import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import netlifyIdentity from "netlify-identity-widget";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Test component that uses auth
function TestComponent() {
  const { user, login, signup, logout, isLoading, error } = useAuth();
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {user && <div>User: {user.email}</div>}
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
  it("should initially render login/signup buttons", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  it("should handle login success", async () => {
    const mockUser = { email: "test@example.com", user_metadata: {} };
    (netlifyIdentity.currentUser as jest.Mock).mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`User: ${mockUser.email}`)).toBeInTheDocument();
    });
  });

  it("should handle login error", async () => {
    const mockError = new Error("Login failed");
    (netlifyIdentity.open as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText("Login").click();
    });

    expect(screen.getByText("Error: Failed to login. Please try again.")).toBeInTheDocument();
  });

  it("should redirect to dashboard after login", async () => {
    const mockUser = { email: "test@example.com", user_metadata: {} };
    let loginCallback: Function;
    
    (netlifyIdentity.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "login") {
        loginCallback = callback;
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      loginCallback(mockUser);
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  it("should clear user and redirect to home after logout", async () => {
    const mockUser = { email: "test@example.com", user_metadata: {} };
    let logoutCallback: Function;
    
    (netlifyIdentity.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "logout") {
        logoutCallback = callback;
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      logoutCallback();
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
