import test from "node:test";
import assert from "node:assert/strict";
import { getFeaturedProjects } from "../src/data/content.js";

test("empty and unfeatured projects do not create placeholder cards", () => {
  assert.deepEqual(getFeaturedProjects([]), []);
  assert.deepEqual(getFeaturedProjects([{ id: "archive-only", featured: false }]), []);
});

test("featured order is independent of archive order and input is unchanged", () => {
  const projects = [{ id: "second", featured: true, featuredOrder: 2 }, { id: "archive-only" }, { id: "first", featured: true, featuredOrder: 1 }];
  const original = structuredClone(projects);
  assert.deepEqual(getFeaturedProjects(projects).map(p => p.id), ["first", "second"]);
  assert.deepEqual(projects, original);
});

test("at most seven real featured entries are selected after ordering", () => {
  const projects = Array.from({ length: 9 }, (_, i) => ({ id: String(i), featured: true, featuredOrder: 9 - i }));
  assert.deepEqual(getFeaturedProjects(projects).map(p => p.id), ["8", "7", "6", "5", "4", "3", "2"]);
});

test("missing order comes last and equal order preserves author order", () => {
  const projects = [{ id: "unsorted", featured: true }, { id: "a", featured: true, featuredOrder: 1 }, { id: "b", featured: true, featuredOrder: 1 }];
  assert.deepEqual(getFeaturedProjects(projects).map(p => p.id), ["a", "b", "unsorted"]);
});
