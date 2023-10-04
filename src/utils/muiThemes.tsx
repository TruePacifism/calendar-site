import { createTheme } from "@mui/material";
import {
  accentColor,
  basicButtonBorderColor,
  hiddenTextColor,
  miniAccentColor,
} from "./vars";
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
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: "0em",
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
          width: 52,
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
