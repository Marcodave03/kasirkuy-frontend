import { ChartArea } from "@/components/areachart";
import Checker from "@/components/checker";
import { DoubleBarChart } from "@/components/doublebarchart";
import { PieChartVisitor } from "@/components/piechart";

export default function HomePage() {
  return(
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Checker/>
      <ChartArea />
      <PieChartVisitor />
      <DoubleBarChart />
    </div>
  );
}
