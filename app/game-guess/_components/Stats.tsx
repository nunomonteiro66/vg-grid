import Card from "./Card";

export default function Stats() {
  return (
    <Card title="STATS">
      <div className="grid grid-cols-2 gap-9">
        <div className="flex flex-col">
          <span>0</span>
          <span>PLAYED</span>
        </div>
        <div className="flex flex-col">0 PLAYED</div>
        <div className="flex flex-col">0 PLAYED</div>
        <div className="flex flex-col">0 PLAYED</div>
      </div>
    </Card>
  );
}
