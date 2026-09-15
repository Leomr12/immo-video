import React from 'react';
import {Composition, Folder} from 'remotion';
import './index.css';
import './immopilier/fonts';
import {ActeI} from './immopilier/ActeI';
import {ActeII} from './immopilier/ActeII';
import {Immopilier} from './immopilier/Immopilier';
import {PlanSeul} from './immopilier/composants/PlanSeul';
import {Plan01} from './immopilier/plans/Plan01';
import {Plan02} from './immopilier/plans/Plan02';
import {Plan03} from './immopilier/plans/Plan03';
import {Plan04} from './immopilier/plans/Plan04';
import {Plan05} from './immopilier/plans/Plan05';
import {Plan06} from './immopilier/plans/Plan06';
import {Plan07} from './immopilier/plans/Plan07';

/**
 * Chaque plan est aussi enregistré seul, à sa durée exacte du script, pour
 * pouvoir être revu et retouché isolément ; dans la composition complète, un
 * double-clic sur la séquence d'un plan y saute directement.
 *
 * `<PlanSeul>` leur redonne le fond qu'ils auront au montage : dans le film
 * c'est une couche continue, un plan isolé n'en verrait rien.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Immopilier"
        component={Immopilier}
        durationInFrames={4050}
        fps={60}
        width={1920}
        height={1080}
      />

      <Composition
        id="Acte-I"
        component={() => (
          <PlanSeul debut={0}>
            <ActeI />
          </PlanSeul>
        )}
        durationInFrames={510}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-I">
        <Composition
          id="Plan-01-Radar"
          component={() => (
            <PlanSeul debut={0}>
              <Plan01 />
            </PlanSeul>
          )}
          durationInFrames={144}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-02-Boussole"
          component={() => (
            <PlanSeul debut={144}>
              <Plan02 />
            </PlanSeul>
          )}
          durationInFrames={132}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-03-Fenetre"
          component={() => (
            <PlanSeul debut={276}>
              <Plan03 />
            </PlanSeul>
          )}
          durationInFrames={96}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-04-Constat"
          component={() => (
            <PlanSeul debut={372}>
              <Plan04 />
            </PlanSeul>
          )}
          durationInFrames={138}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>

      <Composition
        id="Acte-II"
        component={() => (
          <PlanSeul debut={510}>
            <ActeII />
          </PlanSeul>
        )}
        durationInFrames={577}
        fps={60}
        width={1920}
        height={1080}
      />

      <Folder name="Acte-II">
        <Composition
          id="Plan-05-Etapes"
          component={() => (
            <PlanSeul debut={510}>
              <Plan05 />
            </PlanSeul>
          )}
          durationInFrames={240}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-06-Vignettes"
          component={() => (
            <PlanSeul debut={750}>
              <Plan06 />
            </PlanSeul>
          )}
          durationInFrames={199}
          fps={60}
          width={1920}
          height={1080}
        />
        <Composition
          id="Plan-07-Dossier"
          component={() => (
            <PlanSeul debut={949}>
              <Plan07 />
            </PlanSeul>
          )}
          durationInFrames={138}
          fps={60}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
