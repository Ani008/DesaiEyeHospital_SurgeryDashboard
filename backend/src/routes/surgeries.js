// backend/src/routes/surgeries.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// CREATE
router.post("/", async (req, res) => {
  try {
    const surgery = await prisma.Surgery.create({
      data: req.body,
    });
    res.status(201).json(surgery);
  } catch (error) {
    console.error("Error creating surgery:", error);
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const surgeries = await prisma.Surgery.findMany({
      orderBy: { surgeryDate: "desc" },
    });
    res.json(surgeries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const surgery = await prisma.Surgery.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!surgery) return res.status(404).json({ error: "Not found" });
    res.json(surgery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await prisma.Surgery.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await prisma.Surgery.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
