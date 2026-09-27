Import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "./firebase";

export const saveUserProgress = async (userId, progressData) => {
  try {
    // User တစ်ဦးချင်းစီရဲ့ ID အလိုက် Firestore ထဲမှာ Data သိမ်းမည်
    await setDoc(doc(db, "userProgress", userId), {
      ...progressData,
      lastUpdated: new Date()
    }, { merge: true });
    
    console.log("Progress saved successfully!");
  } catch (error) {
    console.error("Error saving progress: ", error);
  }
};
ဒါက ဘယ်မှာထည့်ရမှာလဲ
