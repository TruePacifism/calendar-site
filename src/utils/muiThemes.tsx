import { createTheme } from "@mui/material";
import { accentColor, basicButtonBorderColor, hiddenTextColor } from "./vars";
import { hexToRgba } from "./hexToRgba";

export const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 29,
          paddingRight: 29,
          color: "#ffffff",
          backgroundColor: accentColor,
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "0em",
          textAlign: "center",
          display: "block",
          marginRight: "auto",
          "&:hover": {
            backgroundColor: accentColor,
            opacity: 0.8,
          },
        }),
      },
    },
  },
});

export const modalTheme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          maxWidth:
            document.getElementById("root").clientWidth > 400
              ? 400
              : document.getElementById("root").clientWidth,
          marginRight: "auto",
          marginLeft: "auto",
          backgroundColor: hexToRgba(accentColor, 90),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          maxWidth:
            document.getElementById("root").clientWidth > 400
              ? 400
              : document.getElementById("root").clientWidth,
          marginRight: "auto",
          marginLeft: "auto",
        },
        container: { width: "100%", height: "100%" },
        paper: {
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "transparent",
          pointerEvents: "none",
          "& > *": {
            pointerEvents: "all",
          },
          boxShadow: "none",
        },
      },
    },
  },
});
export const searchModalTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        container: {
          backgroundColor: hexToRgba(accentColor, 90),
        },
        root: {},
        paper: {
          backgroundColor: "transparent",
          transform: "translate(0, -50vh)",
          margin: 0,
        },
      },
    },
  },
});

export const cityInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `1px solid ${basicButtonBorderColor}`,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        focused: {
          flexWrap: "nowrap",
          height: "26px",
          width: "195px",
          color: hiddenTextColor,
          fontSize: "15px",
        },
        inputRoot: {
          fontFamily: "Roboto Slab",
          flexWrap: "nowrap",
          height: "26px",
          width: "195px",
          color: hiddenTextColor,
          fontSize: "15px",
          backgroundColor: "white",
        },
        input: {
          "&:not(.Mui-focused)": {
            flexWrap: "nowrap",
          },
          height: "26px",
          width: "195px",
          fontSize: "15px",
          "::placeholder": {
            opacity: 1,
          },
          color: hiddenTextColor,
        },
        root: {
          "&:not(.Mui-focused)": {
            flexWrap: "nowrap",
          },
          height: "26px",
          width: "195px !important",
          color: hiddenTextColor,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          height: "26px",
          display: "block",
          "::placeholder": {
            opacity: 1,
          },
          color: hiddenTextColor,
          fontSize: "15px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          top: 0,
          color: hiddenTextColor,
        },
        root: {
          fontFamily: "Roboto Slab",
          top: "-13px",
          fontSize: "15px",
          color: hiddenTextColor,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "195px",
        },
      },
    },
  },
});

export const homePageInput = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: accentColor,
          width: "57px",
          height: "39px",
          fontFamily: "Roboto Slab",
          fontWeight: 400,
          fontSize: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: `1px solid ${basicButtonBorderColor}`,
          "::after": {
            display: "none",
          },
          "::before": {
            display: "none",
          },
          marginBottom: "12px",
        },
        input: {
          textAlign: "center",
        },
      },
    },
  },
});

export const dateInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `1px solid ${basicButtonBorderColor}`,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {},
        select: {
          boxSizing: "border-box",
          borderRadius: "5px",
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "13px",
          fontWeight: "400",
          letterSpacing: "0em",
          minWidth: "56px",
          maxWidth: "67px",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
          ":not": {
            ":last-child": {
              marginRight: "5px",
            },
          },
          "::placeholder": {
            opacity: 1,
          },
        },
        icon: {
          fill: hiddenTextColor,
          opacity: 1,
          width: "17px",
          height: "17px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderWidth: "0px",
          borderRadius: "5px",
          "::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "13px",
          fontWeight: "400",
          letterSpacing: "0em",
          minWidth: "56px",
          maxWidth: "67px",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
          ":not": {
            ":last-child": {
              marginRight: "5px",
            },
          },
        },
        input: {
          height: "26px",
          boxSizing: "border-box",
          "::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "26px",
        },
      },
    },
  },
});

export const mainTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          width: "195px",
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
          "::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "13px",
          fontWeight: "400",
          letterSpacing: "0em",
          minWidth: "56px",
          maxWidth: "67px",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
          ":not": {
            ":last-child": {
              marginRight: "5px",
            },
          },
        },
        icon: {
          fill: hiddenTextColor,
          opacity: 1,
          width: "17px",
          height: "17px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "26px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 29,
          paddingRight: 29,
          color: "#ffffff",
          backgroundColor: accentColor,
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "0em",
          textAlign: "center",
          display: "block",
          marginRight: "auto",
          "&:hover": {
            backgroundColor: accentColor,
            opacity: 0.8,
          },
        }),
      },
    },
  },
});
export const googleAuthButton = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: accentColor,
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "0em",
          color: "white",
          textTransform: "none",
          padding: 0,
          width: "250px",
          height: "57px",
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
  },
});
export const radioTheme = createTheme({
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          justifyContent: "space-between",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          opacity: 0,
          width: 0,
          height: 0,
          display: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

export const selectedRadioTheme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          opacity: 0,
          width: 0,
          height: 0,
          display: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: `1px solid ${hiddenTextColor}`,
          borderRadius: "5px",
          backgroundColor: hiddenTextColor,
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: "white",
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

export const birthtimeTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          width: 60,
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "::placeholder": {
            opacity: 1,
          },
        },
      },
    },
  },
});
export const settingsAccordionTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          root: {
            "&.Mui-expanded": {
              color: "#02081E",
              backgroundColor: "red",
            },
          },
        },
      },
    },
  },
});
