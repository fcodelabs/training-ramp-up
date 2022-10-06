import { Field } from "formik";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 0px 20px;
  gap: 10px;
  width: 80%;
  height: 48px;
  border: 1px solid #e3e8ef;
  margin-bottom: 10px;
  border-radius: 12px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #25334f;
  &:focus {
    outline: none;
  }
`;

const RoleList = () => {
  return (
    <Field
      style={{
        width: "95%",
        gap: "10px",
        height: "40px",
        marginBottom: "10px",
        borderRadius: "12px",
        fontFamily: "Nunito",
        color: "grey",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "150%",
        letterSpacing: "-0.02em",
      }}
      as={StyledSelect} // tell TextField to render select
      name="role"
    >
      <option>Admin</option>
      <option>User</option>
    </Field>
  );
};

export default RoleList;
