import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";


export default function Settings() {
    return (
        <div className="text-richblack-5">
            <h1 className="text-3xl font-medium pl-12 pt-10">Edit Profile</h1>

            {/* Change profile picture */}
            <ChangeProfilePicture/>

            {/* Profile */}
            <EditProfile/>

            {/* Password */}
            <UpdatePassword/>

            {/* Delete Account */}
            <DeleteAccount/>
        </div>
    )
}