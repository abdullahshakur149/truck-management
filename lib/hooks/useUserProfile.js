import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let unsubscribe;
        setLoading(true);
        setError("");
        unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setError("No user is logged in.");
                setProfile(null);
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                    setError("");
                } else {
                    setError("User profile not found.");
                }
            } catch (err) {
                setError("Failed to fetch user profile.");
            } finally {
                setLoading(false);
            }
        });
        return () => unsubscribe && unsubscribe();
    }, []);

    return { profile, loading, error };
} 