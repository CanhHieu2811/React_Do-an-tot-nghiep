import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export function overrides(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          // fontSize: 14,
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 0,
          fontSize: 14,
        },
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
          '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[800],
          },
        },
        sizeLarge: {
          minHeight: 30,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.error.main,
          textDecoration: 'unset',
          cursor: 'pointer',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 36,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: "center"
          },
          // '& .MuiDataGrid-container--top [role=row] , & .MuiDataGrid-container--bottom [role=row], & .MuiDataGrid-columnHeader, & .MuiDataGrid-row, & .MuiDataGrid-footerContainer':
          //   {
          //     height: '36px !important',
          //     minHeight: '36px !important',
          //   },
          // '& .MuiDataGrid-cell, & .MuiDataGrid-cell--editing': {
          //   height: '36px',
          //   lineHeight: '36px',
          // },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-colCell:focus-within, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.MuiAccordion-root': {
            borderRadius: "unset"
          },
          '& .MuiAccordionSummary-root': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[0],
            minHeight: '36px !important',
            height: 36,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.grey[0],
          },
          '& .MuiAccordionDetails-root': {
            padding: '8px 12px 8px 12px',
          },
          border: `1px solid ${theme.palette.grey[400]}`,
          
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialogTitle-root': {
            padding: "8px 24px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[0],
            fontSize: 14
          },
          '& .MuiDialogContent-root': {
            padding: 16,
            paddingTop: "12px !important"
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14
        },
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: "1260px",
            paddingLeft: 8,
            paddingRight: 8,
            height: "100%"
          },
          
        }
      }
    },
    // MuiGrid: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiGrid-item': {
    //         paddingLeft: 8,
    //         paddingRight: 8
    //       },
    //       '& .MuiGrid-item:first-of-type': {
    //         paddingRight: 8,
    //         paddingLeft: 0
    //       },
    //       '& .MuiGrid-item:last-of-type': {
    //         paddingLeft: 0
    //       }
    //     }
    //   }
    // },
    // MuiLink: {
    //   styleOverrides: {
    //     root: {
    //      color: theme.palette.primary.main
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       minHeight: 40,
    //       // borderRadius: 0,
    //       // backgroundColor: '#fff',
    //       // border: '1px solid pink',
    //       // fontSize: 16,
    //       // padding: '10px 12px',
    //       // width: 'calc(100% - 24px)',
    //     },
    //     input: {
    //       padding: '8.5px 14px !important',
    //     },
    //   },
    // },
    
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
          '&.MuiInputBase-sizeSmall': {
            // height: 30,
          },
          '& input': {
            padding: '7.94px 14px',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            fontSize: 14
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: 200
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            padding: 0
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
  };
}
