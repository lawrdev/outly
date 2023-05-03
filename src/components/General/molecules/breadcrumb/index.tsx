import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { VscChevronRight } from "react-icons/vsc";

interface CrumbProp {
  title: string;
  href: string;
  isCurrent?: boolean;
}
interface Props {
  crumbs: CrumbProp[];
}
export function Breadcrumbs({ crumbs }: Props) {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<VscChevronRight color="gray.500" />}
      fontSize="md"
      fontWeight="medium"
      color={"outly.black500"}
    >
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index} isCurrentPage={crumb.isCurrent}>
          {crumb.isCurrent ? (
            <BreadcrumbLink _hover={{ textDecoration: "none" }}>
              {crumb.title}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              as={Link}
              href={crumb.href}
              display={"inline-block"}
              position="relative"
              _before={{
                content: "' '",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                height: "2px",
                width: "0%",
                backgroundColor: "outly.black500",
                transition: "all 0.5s cubic-bezier(0.645,0.045,0.355,1)",
              }}
              _hover={{
                _before: { width: "100%" },
              }}
            >
              {crumb.title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
