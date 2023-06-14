/**
 * Exporte le tableau de couches par défaut.
 * @module dataGenerator
 * @default
 */


import { csv } from 'd3-fetch'


/**
 * Lit les fichiers CSV à partir des chemins spécifiés.
 * @async
 * @function readFiles
 * @returns {Promise<Array>} Une promesse résolue avec un tableau contenant les données des fichiers CSV.
 */

async function readFiles() {

  const input = await csv('csv_files/input/sample_ts.csv')
  const output = await csv('csv_files/output/gap-output.csv')
  const conv_0 = await csv('csv_files/layer_1/conv-0-output.csv')
  const conv_1 = await csv('csv_files/layer_2/conv-1-output.csv')
  const conv_2 = await csv('csv_files/layer_3/conv-2-output.csv')
  const activation_0 = await csv('csv_files/layer_1/activation-0-output.csv')
  const activation_1 = await csv('csv_files/layer_2/activation-1-output.csv')
  const activation_2 = await csv('csv_files/layer_3/activation-2-output.csv')
  const max_pool_0 = await csv('csv_files/layer_1/max-pool-0-output.csv')
  const max_pool_1 = await csv('csv_files/layer_2/max-pool-1-output.csv')
  const max_pool_2 = await csv('csv_files/layer_3/max-pool-2-output.csv')



  /**
* Structure de données représentant une couche.
* @typedef {Object} Layer
* @property {number} nodes - Le nombre de nœuds dans la couche.
* @property {string} name - Le nom de la couche.
* @property {number} id - L'identifiant de la couche.
* @property {Array} data - Les données de la couche.
*/

  /**
   * Tableau contenant les différentes couches et leurs données.
   * @type {Array.<Layer>}
   */

  const layers = [
    { nodes: 1, name: 'Input', id: 0, data: input },
    { nodes: conv_0.length, name: 'Conv_1_1', id: 1, data: conv_0 },
    { nodes: max_pool_0.length, name: 'Max_pool_1_1', id: 1, data: max_pool_0 },
    { nodes: activation_0.length, name: 'Activ_func_1_1', id: 1, data: activation_0 },
    { nodes: conv_1.length, name: 'Conv_1_2', id: 2, data: conv_1 },
    { nodes: max_pool_1.length, name: 'Max_pool_1_2', id: 2, data: max_pool_1 },
    { nodes: activation_1.length, name: 'Activ_func_1_2', id: 2, data: activation_1 },
    { nodes: conv_2.length, name: 'Conv_1_3', id: 3, data: conv_2 },
    { nodes: max_pool_2.length, name: 'Max_pool_1_3', id: 3, data: max_pool_2 },
    { nodes: activation_2.length, name: 'Activ_func_1_3', id: 3, data: activation_2 },
    { nodes: output.length, name: 'Output', id: 4, data: output }
  ]

  return layers;
}

const layers = await readFiles();




export default layers;