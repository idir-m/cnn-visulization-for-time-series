import { csv } from 'd3-fetch'


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


    const layers = [
        { nodes: 1, name: 'Input Layer', id: 0, data: input },
        { nodes: conv_0.length, name: 'Convolutional Layer 1', id: 1, data: conv_0 },
        { nodes: max_pool_0.length, name: 'Max Pooling 1', id: 1, data: max_pool_0 },
        { nodes: activation_0.length, name: 'Activation Function 1', id: 1, data: activation_0 },
        { nodes: conv_1.length, name: 'Convolutional Layer 2', id: 2, data: conv_1 },
        { nodes: max_pool_1.length, name: 'Max Pooling 2', id: 2, data: max_pool_1 },
        { nodes: activation_1.length, name: 'Activation Function 2', id: 2, data: activation_1 },
        { nodes: conv_2.length, name: 'Convolutional Layer 3', id: 3, data: conv_2 },
        { nodes: max_pool_2.length, name: 'Max Pooling 3', id: 3, data: max_pool_2 },
        { nodes: activation_2.length, name: 'Activation Function 3', id: 3, data: activation_2 },
        { nodes: output.length, name: 'Output Layer', id: 4, data: output }
    ]

    return layers;
}

const layers = await readFiles();

export default layers;