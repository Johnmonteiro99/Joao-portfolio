import test from "node:test";
import assert from "node:assert/strict";
import { EXPERTISE, PROJECTS, getProjectEvidence } from "../src/data/content.js";
import { EXPERTISE_DIAGRAMS } from "../src/data/expertise-diagrams.js";

test("evidence resolves live metadata and excludes missing or unlinked projects", () => {
  const projects = [{ id: "source", name: "Source", githubUrl: "https://example.com/code" }, { id: "live", name: "Live", liveUrl: "https://example.com/demo" }, { id: "unlinked", name: "Local" }];
  assert.deepEqual(getProjectEvidence(["missing", "source", "unlinked", "live"], projects).map(p => [p.id, p.href, p.action]), [["source", "https://example.com/code", "View source"], ["live", "https://example.com/demo", "Live project"]]);
  projects[0].githubUrl = "https://example.com/new-code";
  assert.equal(getProjectEvidence(["source"], projects)[0].href, "https://example.com/new-code");
});

test("categories reference real projects and complete educational diagrams", () => {
  for (const category of EXPERTISE) {
    assert(category.projectIds.every(id => PROJECTS.some(p => p.id === id)));
    assert.equal(getProjectEvidence(category.projectIds).length, category.projectIds.length);
    const diagram = EXPERTISE_DIAGRAMS[category.diagram];
    assert(diagram, category.id);
    assert.equal(new Set(diagram.nodes.map(n => n.id)).size, diagram.nodes.length);
    assert(diagram.nodes.every(n => n.label && n.explanation));
  }
});

test("HAVEN evidence identifies its JSON data source without claiming a database", () => {
  const data = EXPERTISE_DIAGRAMS["application-flow"].nodes.find(n => n.id === "data");
  assert.match(data.explanation, /HAVEN reads a supplied JSON file/);
  assert.match(EXPERTISE_DIAGRAMS["request-flow"].nodes.find(n => n.id === "load").explanation, /local JSON/);
});


test("project evidence prefers live demos and resolves preview metadata from shared data", () => {
  const project = { id: "both", name: "A project", description: "Current description", image: "/preview.webp", liveUrl: "https://example.com/demo", githubUrl: "https://example.com/source" };
  const evidence = getProjectEvidence(["both"], [project])[0];
  assert.equal(evidence.href, project.liveUrl);
  assert.equal(evidence.action, "Live project");
  assert.equal(evidence.description, project.description);
  assert.equal(evidence.image, project.image);
  project.liveUrl = "https://example.com/updated-demo";
  assert.equal(getProjectEvidence(["both"], [project])[0].href, project.liveUrl);
  assert.equal(project.githubUrl, "https://example.com/source");
});

test("HAVEN evidence opens the deployed application while retaining its separate source URL", () => {
  const haven = getProjectEvidence(["haven"])[0];
  assert.equal(haven.href, "https://haven-listing-search.vercel.app/");
  assert.equal(haven.githubUrl, "https://github.com/Johnmonteiro99/haven-listing-search");
  const astral = PROJECTS.find(project => project.id === "astral-veil");
  assert.equal(getProjectEvidence([astral.id])[0].href, astral.liveUrl);
});
