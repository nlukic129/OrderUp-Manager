export const setSelectedVenueLS = (id: string) => {
  localStorage.setItem("selectedVenue", id);
};

export const removeSelectedVenueLS = () => {
  localStorage.removeItem("selectedVenue");
};

export const getSelectedVenueLS = () => {
  return localStorage.getItem("selectedVenue");
};
