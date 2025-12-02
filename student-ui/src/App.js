import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Divider
} from "@mui/material";

const englishLevels = [
  { value: 1, label: "Level 130" },
  { value: 2, label: "Level 131" },
  { value: 3, label: "Level 140" },
  { value: 4, label: "Level 141" },
  { value: 5, label: "Level 150" },
  { value: 6, label: "Level 151" },
  { value: 7, label: "Level 160" },
  { value: 8, label: "Level 161" },
  { value: 9, label: "Level 170" },
  { value: 10, label: "Level 171" },
  { value: 11, label: "Level 180" }
];

const ageGroups = [
  "0–18", "19–20", "21–25", "26–30", "31–35",
  "36–40", "41–50", "51–60", "61–65", "66+"
];

const schools = [
  "Advancement", "Business", "Communications", "Community & Health",
  "Hospitality", "Engineering", "Transportation"
];

const fundingTypes = [
  "Apprentice_PS", "GPOG_FT", "Intl Offshore", "Intl Regular",
  "Intl Transfer", "Joint Program Ryerson", "Joint Program UTSC",
  "Second Career Program", "Work Safety Insurance Board"
];

export default function App() {
  const [form, setForm] = useState({
    highSchool: "",
    mathScore: "",
    englishGrade: "",
    firstTermGpa: "",
    ageGroup: "",
    gender: "",
    residency: "",
    firstLanguage: "",
    fastTrack: "",
    coop: "",
    prevEducation: "",
    school: "",
    funding: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (form.highSchool < 0 || form.highSchool > 100)
      return "High School Average must be between 0 and 100.";

    if (form.mathScore < 0 || form.mathScore > 50)
      return "Math Score must be between 0 and 50.";

    if (form.firstTermGpa < 0 || form.firstTermGpa > 4.5)
      return "First Term GPA must be between 0 and 4.5.";

    for (const key in form)
      if (form[key] === "") return "Please fill in all fields.";

    return "";
  };

  const handleSubmit = async () => {
    const msg = validate();
    if (msg) return setError(msg);
    setError("");

    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setPrediction(data.predictedGpa);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Student Performance Predictor
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {/* ---------------- ACADEMIC SECTION ---------------- */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Academic Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="High School Average (%)"
              name="highSchool"
              type="number"
              fullWidth
              
              sx={{ minWidth: 200 }}
              value={form.highSchool}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Math Score (0–50)"
              name="mathScore"
              type="number"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.mathScore}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="English Grade"
              name="englishGrade"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.englishGrade}
              onChange={handleChange}
            >
              {englishLevels.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="First Term GPA"
              name="firstTermGpa"
              type="number"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.firstTermGpa}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* ---------------- PERSONAL SECTION ---------------- */}
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {/* Age Group */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Age Group"
              name="ageGroup"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.ageGroup}
              onChange={handleChange}
            >
              {ageGroups.map((age, i) => (
                <MenuItem value={i + 1}>{age}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.gender}
              onChange={handleChange}
            >
              <MenuItem value={1}>Female</MenuItem>
              <MenuItem value={2}>Male</MenuItem>
              <MenuItem value={3}>Neutral</MenuItem>
            </TextField>
          </Grid>

          {/* Residency */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Residency"
              name="residency"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.residency}
              onChange={handleChange}
            >
              <MenuItem value={1}>Domestic</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </TextField>
          </Grid>

          {/* First Language */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="First Language"
              name="firstLanguage"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.firstLanguage}
              onChange={handleChange}
            >
              <MenuItem value={1}>English</MenuItem>
              <MenuItem value={2}>French</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* ---------------- PROGRAM SECTION ---------------- */}
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Program Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {/* Fast Track */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Fast Track?"
              name="fastTrack"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.fastTrack}
              onChange={handleChange}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
            </TextField>
          </Grid>

          {/* Co-op */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Co-op Program?"
              name="coop"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.coop}
              onChange={handleChange}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
            </TextField>
          </Grid>

          {/* Previous Education */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Previous Education"
              name="prevEducation"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.prevEducation}
              onChange={handleChange}
            >
              <MenuItem value={1}>High School</MenuItem>
              <MenuItem value={2}>Post-Secondary</MenuItem>
            </TextField>
          </Grid>

          {/* School */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="School / Faculty"
              name="school"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.school}
              onChange={handleChange}
            >
              {schools.map((sc, i) => (
                <MenuItem value={i + 1}>{sc}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Funding */}
          <Grid item xs={12}>
            <TextField
              select
              label="Funding Type"
              name="funding"
              fullWidth
              sx={{ minWidth: 200 }}
              value={form.funding}
              onChange={handleChange}
            >
              {fundingTypes.map((fund, i) => (
                <MenuItem value={i + 1}>{fund}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* ---------------- SUBMIT BUTTON ---------------- */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 4, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          PREDICT
        </Button>

        {/* Prediction Result */}
        {prediction && (
          <Alert severity="info" sx={{ mt: 3, fontSize: "1.1rem" }}>
            Predicted GPA: {prediction}
          </Alert>
        )}
      </Card>
    </Container>
  );
}
