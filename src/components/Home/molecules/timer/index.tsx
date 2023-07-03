import { HStack, Text, VStack } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useMemo, useState } from "react";

dayjs.extend(duration);

export const SalesTimer = () => {
  const [timerObj, setTimerObj] = useState<{
    day: string | number;
    hour: string | number;
    minute: string | number;
    second: string | number;
  }>();

  const endOfCurrentMonth = useMemo(() => {
    return dayjs(dayjs().endOf("month").format("MMMM D, YYYY h:mm A"));
  }, []);

  useMemo(() => {
    let currentTime = dayjs();
    let diffTime = endOfCurrentMonth.unix() - currentTime.unix();

    let duration = dayjs.duration(diffTime * 1000, "milliseconds");
    var interval = 1000;
    const twoDP = (n: number) => (n > 9 ? n : "0" + n);

    setInterval(function () {
      duration = dayjs.duration(
        duration.asMilliseconds() - interval,
        "milliseconds"
      );
      let timestamp = `${
        duration.days() && duration.days() + "d "
      }${duration.hours()}h ${twoDP(duration.minutes())}m ${twoDP(
        duration.seconds()
      )}s`;

      setTimerObj((prev) => ({
        ...prev,
        day: duration.days(),
        hour: duration.hours(),
        minute: twoDP(duration.minutes()),
        second: twoDP(duration.seconds()),
      }));
      //   setTime(timestamp);
    }, interval);
  }, [endOfCurrentMonth]);

  //   useEffect(() => {
  //     return () => clearInterval(intervalRef);
  //   }, [])

  return (
    <HStack>
      <BoxWrapper bigText={timerObj?.day || "00"} smallText={"Days"} />
      <BoxWrapper bigText={timerObj?.hour || "00"} smallText={"Hours"} />
      <BoxWrapper bigText={timerObj?.minute || "00"} smallText={"Minutes"} />
      <BoxWrapper bigText={timerObj?.second || "00"} smallText={"Seconds"} />
    </HStack>
  );
};

const BoxWrapper = ({
  bigText,
  smallText,
}: {
  bigText: string | number;
  smallText: string | number;
}) => {
  return (
    <VStack
      spacing={"0px"}
      justifyContent={"center"}
      alignItems={"center"}
      border={"1px solid #11111180"}
      borderRadius={"md"}
      w={"82px"}
      h={"100px"}
      //   boxShadow={"md"}
    >
      <Text fontWeight={500} fontSize={"3xl"}>
        {bigText}
      </Text>
      <Text fontSize={"lg"}>{smallText}</Text>
    </VStack>
  );
};
