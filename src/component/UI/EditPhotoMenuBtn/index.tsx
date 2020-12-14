import React from "react";
//import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
//import { connect } from "react-redux";

function EditPhotoMenuBtn({ showEditPhotoForm }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onShowEditPhotoForm = () => {
    handleClose();
    showEditPhotoForm();
  };

  /* const userBtn = React.cloneElement(userButton, {
    onClick: handleClick,
    "aria-controls": "simple-menu",
    "aria-haspopup": "true",
  }); */

  /* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        title="Доступные действия"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={onChangePasswordButtonClick}>
          Сменить пароль
        </MenuItem> */}
        <MenuItem onClick={onShowEditPhotoForm}>Изменить</MenuItem>
      </Menu>
    </>
  );
}

/* const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),
  };
}; */

//export default connect(null, mapDispatchToProps)(NavUserBtnWithMenu);
export default EditPhotoMenuBtn;
