import { useSelector } from "react-redux";
import { userPackageSelector } from "../selectors/userSelector";

export const useUserPackageHook = () =>
{
    return useSelector(userPackageSelector)
}