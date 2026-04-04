import {Line} from "react-chartjs-2";

export default function Dashboard(){
  const data={
    labels:["Mon","Tue","Wed"],
    datasets:[{label:"Health",data:[60,80,70]}]
  };

  return <Line data={data}/>;
}
