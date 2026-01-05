import ReusableButton from "../components/Reusable_Button";

export default {
  title: "Components/ReusableButton",
  component: ReusableButton,
};

export const Primary = () => (
  <ReusableButton
    title="Enabled Button"
    onPress={()=>console.log("Button Pressed")}
  />
);

export const Disabled = () => (
  <ReusableButton
    title="Disabled Button"
    disabled={true}
    onPress={()=>console.log("Button Pressed")}
  />
);
