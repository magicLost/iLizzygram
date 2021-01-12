import Link from "next/link";
import { forwardRef } from "react";
//import classes from './ButtonLink.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const ButtonLink = forwardRef((props: any, ref: any) => (
  <Link href={props.href} as={props.hrefAs}>
    <a className={props.className} ref={ref}>
      {props.children}
    </a>
  </Link>
));

export default ButtonLink;
