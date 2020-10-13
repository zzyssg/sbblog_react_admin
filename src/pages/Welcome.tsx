import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, message } from 'antd';
import { connect } from 'umi';
import { connectState } from '@/models/connect';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


const Welcome = (props: any) => {

  const { dispatch } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch(
        {
          type: 'types/queryAllTypes',
          payload: {

          }

        }
      )
        .then(
          (res: any) => {
            // 设置饼状图
            const typeEchart = echarts.init(document.getElementById("typesContainer"), 'dark');
            const typeData = (res.result).map((type: any) => {
              return {

                name: type.name,
                value: type.blogs.length,

              }
            });
            const typeOption = {
              visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              backgroundColor: "#2c343c",
              textStyle: {
                color: 'rgba(255,255,255,0.3)',
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.3)',
                }
              },
              itemStyle: {
                // 设置扇形的颜色
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0,0,0,0.5)'
              },
              title: {
                show: true,
                text: '博客类型图'
              },
              tooltip: {

              },
              series: {
                itemStyle: {
                  emphasis: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(0,0,0,0.5)',
                  }
                },
                roseType: "angle",
                radius: "75%",
                type: 'pie',
                data: typeData
              }
            }
            typeEchart.setOption(typeOption);
          }
        )

        // 按年份查询博客，设置折线图
        dispatch(
          {
            type : "blogs/queryBlogsByYear",
            payload : {

            }
          }
        )
        .then(
          (res : any) => {
            if(res.retCode === '001'){
              message.success("按年份查询博客成功！！！");
              const yearDataValue = (res.result).map((type: any) => type.blogsOfYear.length);
              const xDataValue = (res.result).map((type: any) => type.curYear);
              const blogsOfYearEchart = echarts.init(document.getElementById("blogsOfYearContainer"), 'dark');
              const blogsYearOption = {
                xAxis : {
                  data : xDataValue,
                },
                title: {
                  show: true,
                  text: '博客时序图'
                },
                yAxis : {},
                series : [{
                  type : 'line',
                  data : yearDataValue
                }]
              };
              blogsOfYearEchart.setOption(blogsYearOption);
            }else{
              message.error("按年份查询博客失败！！！");
            }
          }
        )
    }

  }, []
  )

  return (

    <PageContainer>
      <Row>
        <Col span = {10}>
          {/* <Card> */}
            <div id="typesContainer" style={{ width: "400px", height: "350px" }} />
          {/* </Card> */}
        </Col>
        <Col span = {10}>
        {/* <Card> */}
            <div id="blogsOfYearContainer" style={{ width: "400px", height: "350px" }} />
          {/* </Card> */}
        </Col>
      </Row>
    </PageContainer>
  )

}

// export default Welcome;
export default connect(
  ({ TypeState }: connectState) => ({
    TypeState
  })
)(Welcome);
