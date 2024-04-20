import { useSelector } from "react-redux";
import { addressPackageSelector } from "../selectors/addressSelector";

export const useAddressPackageHook = () =>
{
    return useSelector(addressPackageSelector)
}

