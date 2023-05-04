import { MouseEvent, useState } from "react";
import { Box, chakra, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { CategoryItem } from "./dropdown";
import { Container } from "@/components/General/atoms";

const category: string[] = [
  "Women",
  "Men",
  "Kids & Baby",
  "House items",
  "All accessories",
  "Deals",
  "Sale",
];

export function Categories() {
  const [currActiveMenu, setCurrActiveMenu] = useState<string>("");
  const [backDrop, setBackdrop] = useState(false);

  const updateActiveMenu = (menu: string) => {
    // remove style from prev? active link
    const menuLinks = document.querySelectorAll("a.categoryLink");
    menuLinks?.forEach((link) => {
      if (link.textContent !== menu) link.classList.remove("activeLink");
    });
  };

  const showMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    // show backdrop
    setBackdrop(true);

    // assign current link hovered as active
    const currLink = e.target as HTMLAnchorElement;
    const currMenu: string = currLink.textContent!;

    currLink?.classList.add("activeLink");
    // set new active link
    updateActiveMenu(currMenu);
    setCurrActiveMenu(currMenu);
  };

  const hideMenu = () => {
    // hide line on exit
    const menuLinks = document.querySelectorAll("a.categoryLink");
    menuLinks?.forEach((link) => {
      link.classList.remove("activeLink");
    });

    // hide backdrop
    setBackdrop(false);

    // reset current active menu on exit
    setCurrActiveMenu("");
  };

  return (
    <Box position="relative">
      <chakra.div pt={1} pb={2} onMouseLeave={hideMenu}>
        <Container>
          <chakra.ul className="categoryUL">
            {category.map((item, index: number) => (
              <li className="categoryItem" key={index}>
                <Link
                  href={"/"}
                  onMouseOver={showMenu}
                  className="categoryLink relative"
                >
                  {item}
                </Link>
              </li>
            ))}
          </chakra.ul>
        </Container>
        <chakra.div className="categoryDropdown !text-xs">
          {currActiveMenu !== "" ? (
            <CategoryItem showCate={currActiveMenu} />
          ) : null}
        </chakra.div>
      </chakra.div>

      {backDrop ? (
        <Portal>
          <Box className="backdrop"></Box>
        </Portal>
      ) : null}
    </Box>
  );
}
