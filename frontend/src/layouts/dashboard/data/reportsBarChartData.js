const reportsBarChartData = {
  chart: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Sales", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "error", component: "extension" },
      label: "顾客",
      progress: { content: "100+", percentage: 60 },
    },
    {
      icon: { color: "warning", component: "payment" },
      label: "消费卡",
      progress: { content: "50+", percentage: 90 },
    },
    {
      icon: { color: "primary", component: "library_books" },
      label: "销货记录",
      progress: { content: "300+", percentage: 30 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "服务记录",
      progress: { content: "200+", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
