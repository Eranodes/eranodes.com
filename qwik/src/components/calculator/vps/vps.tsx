import { component$, $ } from "@builder.io/qwik";
import styles from "./vps.module.css";
import costs from "../../../data/resources.json";

export default component$(() => {
  const calculateCost = $(() => {
    const numServersInput = document.getElementById("numServers") as HTMLInputElement;
    const memoryInput = document.getElementById("memory") as HTMLInputElement;
    const diskInput = document.getElementById("disk") as HTMLInputElement;
    const cpuInput = document.getElementById("cpu") as HTMLInputElement;

    if (!numServersInput || !memoryInput || !diskInput || !cpuInput) {
      return;
    }

    const numServers = parseInt(numServersInput.value) || 0;
    const memory = (parseInt(memoryInput.value) || 0) * 100;
    const disk = (parseInt(diskInput.value) || 0) * 100;
    const cpu = (parseInt(cpuInput.value) || 0) * 50;

    // Get cost constants from JSON data
    const { server, memory: memoryCostPerMB, disk: diskCostPerMB, cpu: cpuCostPerPercent } = costs;

    // Calculate total cost using constants
    const serverCost = numServers * server;
    const memoryCost = memory * memoryCostPerMB;
    const diskCost = disk * diskCostPerMB;
    const cpuCost = cpu * cpuCostPerPercent;

    const totalCost = serverCost + memoryCost + diskCost + cpuCost;

    document.getElementById("totalCost")!.innerText = `Total Cost: ${totalCost} coins`;
    document.getElementById("resources")!.innerText = `(${numServers} servers, ${memory} MB memory, ${disk} MB disk, ${cpu} % CPU)`;
  });

  return (
    <div class={styles.container}>
      <h3>Resource Calculator</h3>
      <div class={styles["input-group"]}>
        <label for="numServers">Number of Servers:</label>
        <input type="text" id="numServers" placeholder="Enter number of servers" pattern="\d*" />
      </div>
      <div class={styles["input-group"]}>
        <label for="memory">Memory (MB):</label>
        <input type="text" id="memory" placeholder="Enter memory (x100 will be applied)" pattern="\d*" />
      </div>
      <div class={styles["input-group"]}>
        <label for="disk">Disk (MB):</label>
        <input type="text" id="disk" placeholder="Enter disk space (x100 will be applied)" pattern="\d*" />
      </div>
      <div class={styles["input-group"]}>
        <label for="cpu">CPU (%):</label>
        <input type="text" id="cpu" placeholder="Enter CPU (x50 will be applied)" pattern="\d*" />
      </div>
      <button onClick$={calculateCost}>Calculate</button>
      <div id="totalCost" role="status" aria-live="polite"></div>
      <div id="resources" role="status" aria-live="polite"></div>
    </div>
  );
});