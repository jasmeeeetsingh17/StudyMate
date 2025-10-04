// src/utils/storageDebug.js - Add this file to debug localStorage issues

export const StorageDebugger = {
    // Check all localStorage keys
    checkAllKeys() {
        console.log('=== LOCALSTORAGE DEBUG ===');
        console.log('All keys:', Object.keys(localStorage));

        Object.keys(localStorage).forEach(key => {
            const value = localStorage.getItem(key);
            console.log(`${key}:`, value);
        });
        console.log('========================');
    },

    // Check user data
    checkUser() {
        const userStr = localStorage.getItem('studyMateUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            console.log('✅ User found:', user);
            return user;
        } else {
            console.log('❌ No user in localStorage');
            return null;
        }
    },

    // Check tasks for a specific user
    checkTasks(userId) {
        if (!userId) {
            const user = this.checkUser();
            userId = user?.uid;
        }

        if (!userId) {
            console.log('❌ Cannot check tasks: No user ID');
            return null;
        }

        const tasksKey = `tasks_${userId}`;
        const tasksStr = localStorage.getItem(tasksKey);

        if (tasksStr) {
            const tasks = JSON.parse(tasksStr);
            console.log(`✅ Tasks found for ${tasksKey}:`, tasks);
            console.log(`   Total tasks: ${tasks.length}`);
            return tasks;
        } else {
            console.log(`❌ No tasks found for ${tasksKey}`);
            return [];
        }
    },

    // Test save operation
    testSave(userId, testTask) {
        if (!userId) {
            console.log('❌ Cannot test save: No user ID provided');
            return false;
        }

        const tasksKey = `tasks_${userId}`;
        const testData = testTask || {
            id: Date.now(),
            subject: 'Test',
            topic: 'Test Topic',
            title: 'Test - Test Topic',
            completed: false,
            createdAt: new Date().toISOString()
        };

        try {
            // Get existing tasks
            const existing = JSON.parse(localStorage.getItem(tasksKey) || '[]');

            // Add test task
            const updated = [...existing, testData];

            // Save
            localStorage.setItem(tasksKey, JSON.stringify(updated));

            // Verify
            const verified = JSON.parse(localStorage.getItem(tasksKey));

            if (verified.length === updated.length) {
                console.log('✅ Test save successful:', testData);
                return true;
            } else {
                console.log('❌ Test save failed: Verification mismatch');
                return false;
            }
        } catch (error) {
            console.log('❌ Test save error:', error);
            return false;
        }
    },

    // Clear all data (for testing)
    clearAll() {
        console.log('⚠️ Clearing all localStorage data...');
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            localStorage.removeItem(key);
            console.log(`   Removed: ${key}`);
        });
        console.log('✅ All data cleared');
    },

    // Clear only user data
    clearUserData() {
        console.log('⚠️ Clearing user data...');
        localStorage.removeItem('studyMateUser');

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('tasks_')) {
                localStorage.removeItem(key);
                console.log(`   Removed: ${key}`);
            }
        });
        console.log('✅ User data cleared');
    },

    // Full diagnostic
    runDiagnostic() {
        console.log('\n\n🔍 === STORAGE DIAGNOSTIC ===\n');

        console.log('1. Checking all keys...');
        this.checkAllKeys();

        console.log('\n2. Checking user data...');
        const user = this.checkUser();

        if (user) {
            console.log('\n3. Checking tasks...');
            this.checkTasks(user.uid);

            console.log('\n4. Testing save operation...');
            this.testSave(user.uid);

            console.log('\n5. Final verification...');
            this.checkTasks(user.uid);
        } else {
            console.log('\n⚠️ No user logged in, skipping task checks');
        }

        console.log('\n=========================\n\n');
    }
};

// Make it available globally for easy debugging in console
if (typeof window !== 'undefined') {
    window.StorageDebugger = StorageDebugger;
}

export default StorageDebugger;