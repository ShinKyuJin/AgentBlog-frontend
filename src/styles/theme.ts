const BORDER_RADIUS = "4px";
const BOX_BORDER = "1px solid #e6e6e6";
const Theme = {
  bgColor: "rgba(33, 37, 41, 0.008)",
  homeBgColor: "rgba(33, 37, 41, 0.028)",
  maxWidth: "100%",
  blackColor: "#262626",
  deepDarkGreyColor: "rgb(33, 37, 41)",
  darkGreyColor: "#999",
  lightGreyColor: "#c7c7c7",
  blueColor: "#3897f0",
  greenColor: "rgb(32, 201, 151)",
  redColor: "#ED4956",
  darkBlueColor: "#003569",
  boxBorder: BOX_BORDER,
  borderRadius: BORDER_RADIUS,
  whiteBox: `border-radius:${BORDER_RADIUS};
            border:${BOX_BORDER};
            background-color:white;
  `,
  responsiveContainer: `
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1280px;
  }
  @media (max-width: 1312px) {
    width: 912px;
  }
  @media (max-width: 944px) {
    width: calc(100% - 2rem);
  }
  @media (max-width: 767px) {
    width: calc(100% - 2rem);
  }
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  `,
};

export default Theme;
