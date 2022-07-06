import React from "react";
import { Popup, PopupBox } from "../Styles/StyledComponents";

export const EditForm = props =>{
    return (
        <Popup>
          <PopupBox className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            {props.content}
          </PopupBox>
        </Popup>
      );

}