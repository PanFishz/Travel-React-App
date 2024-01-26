const Yup = require("yup");

module.exports.tripSchema = Yup.object({
    destination: Yup.string()
        .required("destination is required"),
    duration: Yup.number()
        .required("duration is required")
        .min(1, "duration must be longer than 1")
        .max(1000, "duration must not exceed 1000"),
});

module.exports.destinationSchema = Yup.object({
    destination: Yup.string()
        .required("destination is required!")
})

module.exports.activitySchema = Yup.object({
    title: Yup.string()
        .required("title is required"),
    location: Yup.string()
        .required("location is required")
})

module.exports.activityTitleSchema = Yup.object({
    title: Yup.string()
        .required("title is required"),
})

module.exports.activityLocationSchema = Yup.object({
    location: Yup.string()
        .required("location is required")
})

module.exports.noteSchema = Yup.object({
    category: Yup.string()
        .required("note category is required").oneOf(['address', 'url', 'image', 'note']),
    content: Yup.string()
        .required("note content is required")
})