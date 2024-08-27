import { useContext } from "react";
import { ProfileContext } from "../context";

export function useProfile() {
    return (
        useContext(ProfileContext)
    )
}
