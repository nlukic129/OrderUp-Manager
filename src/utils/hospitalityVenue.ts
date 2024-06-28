export const setSelectedVenue = (id: string) => {
  localStorage.setItem("selectedVenue", id);
};

export const removeSelectedVenue = () => {
  localStorage.removeItem("selectedVenue");
};
