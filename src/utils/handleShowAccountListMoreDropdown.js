export const handleShowAccountListMoreDropdown = (
  id,
  visibleDropdown,
  setVisibleDropdown
) => {
  if (visibleDropdown === id) {
    setVisibleDropdown("");
  } else {
    setVisibleDropdown(id);
  }
};
