export const getInitials = (fullName: string | undefined): string => {
  const capitalize = (name: string): string => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  const nameParts = fullName ? fullName.trim().split(' ') : '';

  // Create initials from the first two parts (first name and last name)
  const firstNameInitial = nameParts[0] ? capitalize(nameParts[0]) : '';
  const lastNameInitial = nameParts[1] ? capitalize(nameParts[1]) : '';

  return `${firstNameInitial}${lastNameInitial}`;
};
