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
    MuiDialog: {
      styleOverrides: {
        container: {
          backgroundColor: hexToRgba(accentColor, 90),
        },
        paper: {
          width: "100vw",
          margin: 0,
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
    MuiAutocomplete: {
      styleOverrides: {
        focused: {
          flexWrap: "nowrap",
          height: "26px",
          width: "195px",
        },
        inputRoot: { flexWrap: "nowrap", height: "26px", width: "195px" },
        input: {
          "&:not(.Mui-focused)": {
            flexWrap: "nowrap",
          },
          height: "26px",
          width: "195px",
          fontSize: "11px",
        },
        root: {
          "&:not(.Mui-focused)": {
            flexWrap: "nowrap",
          },
          height: "26px",
          width: "195px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          height: "26px",
          display: "block",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          top: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          top: 0,
        },
        root: {
          top: "-13px",
          fontSize: "0.85rem",
        },
      },
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       boxSizing: "border-box",
    //       border: `1px solid ${basicButtonBorderColor}`,
    //       borderRadius: "5px",
    //       height: "26px",
    //       paddingTop: "0",
    //       paddingLeft: "2px",
    //       paddingRight: "11px",
    //       fontFamily: "Roboto Slab",
    //       fontSize: "15px",
    //       fontWeight: "400",
    //       letterSpacing: "0em",
    //       color: hiddenTextColor,
    //       textAlign: "left",
    //       paddingBottom: "0",
    //     },
    //   },
    // },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "26px",
        },
      },
    },
  },
});

export const dateInputTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        outlined: {
          border: `1px solid ${basicButtonBorderColor}`,
        },
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: `0px`,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
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
