import Button from "@/components/shared/button";
import accountActivation from "@/components/authComponent/AccountActivation";
import { FaUserEdit, FaKey, FaTrashAlt, FaBell } from 'react-icons/fa';
import AccountActivation from "@/components/authComponent/AccountActivation";
import Logo from "@/components/shared/Logo";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
   <main>
    
    <AccountActivation/>                                      
  <div className="p-4 space-y-4">
    
      <Button variant="primary" icon={<FaBell />}>Create Account</Button>
      <div className="flex space-x-2">
        <Button variant="secondary" icon={<FaUserEdit />}>Edit Profile</Button>
        <Button variant="default" icon={<FaKey />}>Change Password</Button>
        <Button variant="danger" icon={<FaTrashAlt />}>Delete My Account</Button>
      </div>
      <div className="flex space-x-2">
        <Button variant="default">Cancel</Button>
        <Button variant="save">Save</Button>
        <Button variant="save">UnSave</Button>
      </div>
    </div>
    <Footer/>
   </main>
  );
}
