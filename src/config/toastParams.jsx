export const loginToast = {
  pending: "Logging in... 🚀",
  success: "Logged in successfully 🎉",
  error: "Error while logging in 😔",
};

export const userToastAdd = {
  pending: "Please wait...",
  success: "User has been successfully created.",
  error: {
    render({ data }) {
      return `${data}`;
    },
  },
};

export const userToastUpdate = {
  pending: "Please wait...",
  success: "User has been successfully updated.",
  error: "Error while updating user.",
};

export const userToastDelete = {
  pending: "Please wait...",
  success: "User has been successfully deleted.",
  error: {
    render({ data }) {
      return `${data}`;
    },
  },
};

export const noteToastAdd = {
  pending: "Please wait...",
  success: "Note has been successfully created.",
  error: "Error while creating note.",
};

export const noteToastUpdate = {
  pending: "Please wait...",
  success: "Note has been successfully updated.",
  error: "Error while updating note.",
};

export const noteToastDelete = {
  pending: "Please wait...",
  success: "Note has been successfully deleted.",
  error: {
    render({ data }) {
      return `${data}`;
    },
  },
};
