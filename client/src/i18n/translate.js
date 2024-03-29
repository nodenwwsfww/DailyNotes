const translator = require('@parvineyvazov/json-translator');
/*
Let`s translate our deep object from English to Spanish
*/

const en_lang = {
    "titles": {
        "deleting-note": "Deleting Note",
        "unsaved-content": "Unsaved Content",
        "create-note": "Create new note"
    },
    "tooltip": {
        "today": "Go to Today"
    },
    "headers": {
        "login": "Login",
        "signup": "Sign Up",
        "tags": "Tags",
        "notes": "Notes",
        "projects": "Projects"
    },
    "buttons": {
        "Delete": "Delete",
        "Discard": "Discard",
        "Cancel": "Cancel",
        "Search": "Search",
        "Save-Continue": "Save & Continue",
        "Try-again": "Try again",
        "Start-Fresh": "Start Fresh",
        "Tasks": "Tasks",
        "Search-notes": "Search notes",
        "Save": "Save",
        "Export-Notes": "Export Notes",
        "Logout": "Logout"
    },
    "errors": {
        "notfound": "Page Not Found. Please go back and try again.",
        "saving-error": "There was an error saving. Please try again.",
        "deleting-error": "There was an error deleting note. Please try again.",
        "login": "There was an error logging in. Please try again.",
        "creating-account-error": "There was an error creating your account. Please try again.",
        "unauthorized": "You are unauthorized to view this page. Please go back.",
        "any-error": "There was an error. Please go back and try again.",
        "save-day": "There was an error retrieving that date. Redirecting to today.",
        "fetch-selected-date": "Failed to fetch the selected date. Would you like to start fresh or try again?"
    },
    "notifications": {
        "no-match-notes": "There are no notes that match that query."
    },
    "suggestions": {
        "unsaved-changes": "You have unsaved changes changes. What would you like to do?"
    },
    "success": {
        "note-deleted": "Note deleted!",
        "daily-note-deleted": "Daily note deleted!"
    },
    "form": {
        "placeholders": {
            "username": "Username",
            "password": "Password",
            "confirm-password": "Confirm password",
            "search-query": "Search query"
        },
        "errors": {
            "username": "Username must be filled",
            "password": "Password must be filled",
            "confirm-password": "Passwords must match."
        }
    },
    "search": {
        "Project": "Project",
        "Tag": "Tag",
        "Text": "Text"
    },
    "sure-confirms": {
        "delete-confirmation": "Are you sure you want to <b>delete</b> this note? This action cannot be undone!",
        "discard-unsaved": "Are you sure you want to discard the unsaved content?",
        "delete-daily-note": "Are you sure you want to <b>delete</b> this daily note? This action cannot be undone!"
    }
};

/*
FOR JavaScript don`t use translator.translatedObject (No need to remark its type)
*/

const main = async () => {
    let es_lang = await translator.translateObject(
        en_lang,
        translator.languages.English,
        translator.languages.Turkish
    );

    const json = JSON.stringify(es_lang);
    console.log(json)
};
main()