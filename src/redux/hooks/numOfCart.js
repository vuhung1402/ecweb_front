import { useSelector } from "react-redux";
import { numOfCartPackageSelector } from "../selectors/numOfCartSelector";

export const useNumOfCartPackageHook = () =>
{
    return useSelector(numOfCartPackageSelector)
}
