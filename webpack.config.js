const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // 분석결과를 파일로 저장
      reportFilename: "docs/size_dev.html", // 분설결과 파일을 저장할 경로와 파일명 지정
      defaultSizes: "parsed",
      openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
      generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
      statsFilename: "docs/stats_dev.json", // stats.json 파일명 rename
    }),
  ],
  output: {
    chunkFilename:
      process.env.NODE_ENV === "production"
        ? "[name].[chunkhash].js"
        : "[name].[hash].js",
  },
};
