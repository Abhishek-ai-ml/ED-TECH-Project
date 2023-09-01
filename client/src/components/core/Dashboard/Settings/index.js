import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";


export default function Settings() {
    return (
        <div className="text-richblack-5 flex flex-col w-full items-start gap-y-5 ">
            <h1 className="text-3xl font-medium pt-10  flex items-center mx-auto w-9/12">Edit Profile</h1>

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