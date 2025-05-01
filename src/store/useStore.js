import { create } from "zustand";

// Zustand store
const useStore = create((set) => ({
  // Initial state
  formData: {},

  // Function to update data from different pages
  updateData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),

  // Function to submit all collected data to backend
  submitData: async () => {
    const { formData } = useStore.getState();
    console.log("Submitting data:", formData);

    try {
      const response = await fetch("https://your-backend.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      console.log("Submitted successfully!");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  },
}));

export default useStore;
