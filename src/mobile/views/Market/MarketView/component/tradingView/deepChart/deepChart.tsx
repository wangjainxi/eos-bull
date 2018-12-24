// import * as React from 'react';
// import F2 from '@antv/f2';
// // import './priceChart.css';

// class PriceChart extends React.Component {
//   componentDidMount() {
//     // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
//     const data = [
//       { genre: 'Shooter', sold: 350 },
//       { genre: 'Other', sold: 150 },
//     ];

//     // Step 1: 创建 Chart 对象
//     const chart = new F2.Chart({
//       id: 'myChart',
//       pixelRatio: window.devicePixelRatio, // 指定分辨率
//       padding: 'auto',
//     });

//     // Step 2: 载入数据源
//     chart.source(data);
//     chart.axis('field', { y: { position: 'right' } });

//     // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
//     chart
//       .interval()
//       .position('genre*sold')
//       .color('genre');
//     // Step 4: 渲染图表
//     chart.render();
//   }
//   render() {
//     return (
//       <div className="chartBox">
//         <canvas id="myChart" width="1200" height="560" />
//       </div>
//     );
//   }
// }
// export default PriceChart;
