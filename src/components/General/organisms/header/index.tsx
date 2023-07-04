import { useState, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Navbar } from "../navbar";
import { Container, SlideUp } from "@/components/General/atoms";
import { LocationNav } from "./locationNav";
import { BsChevronUp } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";

export function Header({ inActive }: { inActive?: boolean }) {
  const [scrollDirection, setScrollDirectione] = useState("top");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        setScrollDirectione("down");
      }
      if (y < lastVal) {
        setScrollDirectione("up");
      }
      if (y === 0 || y < 420) {
        setScrollDirectione("top");
      }
      if (y === 310 || y < 570) {
        setHide(true);
      }
      if (y < 210 || y > 570) {
        setHide(false);
      }
      lastVal = y;
    };
  }, []);

  return (
    <>
      <Box position={"relative"}>
        <Box bg="outly.black" color={"gray.200"}>
          <Container>
            <LocationNav />
          </Container>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          height={"76px"}
          // minHeight={"100px"}
          width={"100%"}
          opacity={inActive ? 1 : hide ? 0 : 1}
          position={
            inActive
              ? "relative"
              : scrollDirection === "top"
              ? "absolute"
              : "fixed"
          }
          zIndex={501}
          bg={
            inActive
              ? "none"
              : scrollDirection === "top"
              ? "none"
              : scrollDirection === "down"
              ? "white"
              : scrollDirection === "up"
              ? "white"
              : "outly.main"
          }
          top={
            inActive
              ? 0
              : scrollDirection === "top"
              ? "34px"
              : scrollDirection === "down"
              ? "-76px"
              : scrollDirection === "up"
              ? "0px"
              : 0
          }
          userSelect="none"
          boxShadow={
            inActive
              ? "none"
              : scrollDirection === "top"
              ? "none"
              : scrollDirection === "down"
              ? "0px 0px 5px #0D253F50"
              : scrollDirection === "up"
              ? "0px 0px 5px #0D253F50"
              : "none"
          }
          transition="all 0.35s cubic-bezier(0.645,0.045,0.355,1) 0s"
        >
          <Container>
            <Navbar />
          </Container>
        </Box>
      </Box>

      {inActive && scrollDirection === "up" ? (
        <Box position={"fixed"} bottom={"60px"} right={"20px"} zIndex={502}>
          <SlideUp>
            <IconButton
              colorScheme={"appMain"}
              borderRadius={"full"}
              size={"lg"}
              icon={<FaChevronUp fontSize={"20px"} />}
              aria-label={"scroll to the top"}
              boxShadow={"xl"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </SlideUp>
        </Box>
      ) : null}
    </>
  );
}
