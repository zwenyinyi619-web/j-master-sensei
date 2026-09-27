import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "./firebase";

// User ရဲ့ Progress တွေကို Firestore ထဲမှာ သိမ်းဆည်းရန်
export const saveUserProgress = async (userId, progressData) => {
  if (!userId) return;
  try {
    await setDoc(doc(db, "userProgress", userId), {
      ...progressData,
      lastUpdated: new Date()
    }, { merge: true });
    
    console.log("Progress saved successfully!");
  } catch (error) {
    console.error("Error saving progress: ", error);
  }
};

// User ရဲ့ သိမ်းဆည်းထားတဲ့ Progress တွေကို ပြန်လည်ဖတ်ရှုရန် (Load လုပ်ရန်)
export const getUserProgress = async (userId) => {
  if (!userId) return null;
  try {
    const docRef = doc(db, "userProgress", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such progress document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting progress: ", error);
    return null;
  }
};
