/* eslint-disable qwik/jsx-a */
import { component$ } from "@builder.io/qwik";
import styles from "./secondary-footer.module.css";
import { LuFolderKanban, LuLayers } from "@qwikest/icons/lucide";
import { BsCloud } from "@qwikest/icons/bootstrap";
import Socials from "../socials/socials";

export default component$(() => {

  return (
    <div class={styles.secondaryFooter}>
      {/*EraNodes Section */}
      <div class={styles.column}>
        <a class={styles.columnheading}>
        <BsCloud /> EraNodes
        </a>
        <ul class={styles.columnlinks}>
          <li>
            <a
              href="/about"
              >
              About us
            </a>
          </li>
          <li>
            <a
              href="/terms-of-service"
              >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/privacy-policy"
              >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://www.trustpilot.com/review/eranodes.com"
              >
              Feedback
            </a>
          </li>
          <li>
            <a href="mailto:support@eranodes.com">
              Contact us
            </a>
          </li>
        </ul>
      </div>

      {/*Products Section */}
      <div class={styles.column}>
        <a class={styles.columnheading}>
          <LuFolderKanban /> Pages
        </a>
        <ul class={styles.columnlinks}>
          <li>
            <a
              href="https://dash.eranodes.com"
              target="_blank"
              >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="https://panel.eranodes.com"
              target="_blank"
              >
              Panel
            </a>
          </li>
          <li>
            <a
              href="https://status.eranodes.com"
              target="_blank"
              >
              Status Page
            </a>
          </li>
        </ul>
      </div>

      {/*Resources Section */}
      <div class={styles.column}>
        <a class={styles.columnheading}>
          <LuLayers /> Resources
        </a>
        <ul class={styles.columnlinks}>
          <li>
            <a
              href="https://status.eranodes.com"
              target="_blank"
              >
              Status page
            </a>
          </li>
          <li>
            <a
              href="https://github.com/eranodes"
              target="_blank"
              >
              Open Source
            </a>
          </li>
        </ul>
      </div>

      <div class={styles.column}>
        <Socials />
      </div>

    </div>
  );
});
