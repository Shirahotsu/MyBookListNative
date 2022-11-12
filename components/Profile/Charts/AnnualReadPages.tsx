import React, { useEffect, useState } from "react";
import { loadProfileDetails } from "../../../firebase/profile.firebase";
import { profileStore } from "../../../store/profile.store";
import { DailyReadPages } from "../../../models/Profile.model";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Text } from "../../Themed";
import Spacing from "../../../constants/Spacing";
import FontSize from "../../../constants/FontSize";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      displayColors: false,
    },
  },
};

const labels = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];

const fullLabels = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const INITIAL_DATA = {
  labels,
  datasets: [
    {
      label: "",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    },
  ],
};

const getTotalReadPagesPerMonth = (
  dailyReadPages: DailyReadPages[],
): number[] => {
  const monthsObj = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
  };
  dailyReadPages.filter(item => {
    const date = new Date(item.seconds * 1000);
    const today = new Date()
    if(date.getFullYear() === today.getFullYear()){
      return item
    }
  })
    .map((item) => {
      const date = new Date(item.seconds * 1000);
      const key = date.getMonth();
      monthsObj[key] = monthsObj[key] + item.pages;
    });
  return Object.values(monthsObj);
};

export default function AnnualReadPages() {
  const [data, setData] = useState([123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true)
  const [maxValue, setMaxValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState({ index: 0, value: 0 });

  useEffect(async () => {
    await loadProfileDetails();
    const dailyReadPages: DailyReadPages[] = profileStore.dailyReadPages;
    const totalReadPagesPerMonth = getTotalReadPagesPerMonth(dailyReadPages);
    setMaxValue(Math.max(...totalReadPagesPerMonth));

    setData(totalReadPagesPerMonth);
    setIsLoading(false)
  }, []);

  const width = Dimensions.get("window").width - 20;
  const height = 220;

  const graphStyle = {
    backgroundColor: "#222222",
    backgroundGradientFrom: "#222222",
    backgroundGradientTo: "#222222",
    propsForBackgroundLines: {
      stroke: "#ffffff",
    },

    color: () => "#9A67EA",
  };

  const getHeightPercentage = (value): number => {
    return (value / (maxValue)) * 100;
  };

  const handleOnChartItemClick = (index: number, value: number) => {
    setSelectedValue({ index, value });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          maxHeight: 230,
          width: "100%",
          paddingHorizontal: Spacing.xs
        }}
      >
        {data.map((item, index) => (

          <View key={index}
                style={{ width: 20, flex: 1, flexDirection: "column", height: 230, justifyContent: "flex-end" }}>
            {
              !isLoading && maxValue>0 &&
              <TouchableOpacity style={{ height: getHeightPercentage(item) + "%", justifyContent: "flex-end" }}
                                onPress={() => handleOnChartItemClick(index, item)}>
                <View style={{
                  backgroundColor: "#9A67EA",
                  width: 20,
                  height: "100%",
                }} />
              </TouchableOpacity>
            }
            <Text style={{ marginTop: Spacing.xs }}>{labels[index]}</Text>
          </View>

        ))}
      </View>
      <View style={{ flex: 1, height: 30, marginVertical: Spacing.md, flexDirection: 'row', paddingHorizontal: Spacing.xs}}>
        <Text style={{fontSize: FontSize.h5, marginRight: Spacing.sm}}>Wybrano: </Text>
        {
          selectedValue && selectedValue.value > 0 &&
          <Text style={{fontSize: FontSize.h5}}>{fullLabels[selectedValue.index]}: {selectedValue.value}</Text>
        }
      </View>
    </>
  );
}
