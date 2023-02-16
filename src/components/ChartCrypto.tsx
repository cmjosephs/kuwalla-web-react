import Chart from "react-apexcharts";
import type { Props } from "react-apexcharts";
type chartProps = {
  data: { t: number; v: number }[];
  type: Props["type"];
};

export default function ChartCrypto({ data, type }: chartProps) {
  const series = [
    {
      data: data.map((pricePoint) => {
        return [pricePoint.t, pricePoint.v];
      }),
    },
  ];

  const options = {
    // xaxis: {
    //   type: "datetime",
    // },
    tooltip: {
      theme: "dark",
    },
  };
  console.log(data);
  return (
    <div>
      <Chart options={options} type={type} series={series} width={1000} />
    </div>
  );
}
