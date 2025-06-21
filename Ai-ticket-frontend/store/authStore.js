import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,

  login: async (form, navigate) => {
    set({ loading: true });
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({
          user: data.user,
          token: data.token,
        });
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
